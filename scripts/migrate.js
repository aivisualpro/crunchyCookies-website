
const { MongoClient } = require('mongodb');

// Configuration
const SOURCE_URI = "mongodb+srv://shayanarif:SdUnFwwBaMYqWNEI@crunchy-cookies-cluster.u7dhihc.mongodb.net/?retryWrites=true&w=majority&appName=crunchy-cookies-cluster";
// Target URI includes the DB name 'crunchy-cookies'
const TARGET_URI = "mongodb+srv://admin_db_user:nVAsAXsHAxztSe8S@cluster0.czozayg.mongodb.net/crunchy-cookies";

async function migrate() {
  const sourceClient = new MongoClient(SOURCE_URI);
  const targetClient = new MongoClient(TARGET_URI);

  try {
    console.log("Connecting to source...");
    await sourceClient.connect();
    console.log("Connected to source.");

    console.log("Connecting to target...");
    await targetClient.connect();
    console.log("Connected to target.");

    // 1. Identify which database to copy from Source
    // Since the connection string didn't specify a DB, we list them.
    const adminDb = sourceClient.db().admin();
    const dbs = await adminDb.listDatabases();
    
    // Filter out system DBs
    const systemDbs = ['admin', 'local', 'config'];
    // We'll look for likely candidates. 
    // Usually the one named 'test' or 'crunchy-cookies' or similar.
    const candidateDbs = dbs.databases.filter(db => !systemDbs.includes(db.name));

    if (candidateDbs.length === 0) {
      console.log("No user databases found on source.");
      return;
    }

    console.log("Found databases on source:", candidateDbs.map(d => d.name));

    // We'll assume we want to copy ALL non-system databases into the single target DB 
    // OR just the most relevant one. 
    // Given the target is 'crunchy-cookies', if there's a source DB named 'crunchy-cookies' or 'test', we take it.
    // If there are multiple, this might be tricky. Let's iterate.
    
    const targetDb = targetClient.db(); // Uses the DB from TARGET_URI ('crunchy-cookies')

    for (const dbInfo of candidateDbs) {
      console.log(`\n--- Migrating database: ${dbInfo.name} ---`);
      const sourceDb = sourceClient.db(dbInfo.name);
      
      const collections = await sourceDb.listCollections().toArray();
      
      for (const colInfo of collections) {
        const colName = colInfo.name;
        console.log(`Migrating collection: ${colName}...`);
        
        const sourceCol = sourceDb.collection(colName);
        const targetCol = targetDb.collection(colName); // flattening into the one target DB?

        // If the source had multiple DBs, we might be merging them. 
        // This is a common simplified migration strategy. 
        // "test" is common default.
        
        const cursor = sourceCol.find({});
        const totalDocs = await sourceCol.countDocuments();
        console.log(`  Found ${totalDocs} documents.`);

        if (totalDocs === 0) continue;

        let processed = 0;
        // Batch processing
        while (await cursor.hasNext()) {
          const doc = await cursor.next();
          try {
             // Use replaceOne with upsert to prevent duplicates if running multiple times
             await targetCol.replaceOne({ _id: doc._id }, doc, { upsert: true });
             processed++;
             if (processed % 50 === 0) {
               process.stdout.write(`\r  Processed: ${processed}/${totalDocs}`);
             }
          } catch (e) {
            console.error(`\n  Error copying doc ${doc._id}:`, e.message);
          }
        }
        console.log(`\n  Done with ${colName}.`);
      }
    }

    console.log("\nMigration completed successfully.");

  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await sourceClient.close();
    await targetClient.close();
  }
}

migrate();
