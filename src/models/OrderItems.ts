import mongoose, { CallbackError } from 'mongoose';

interface IAllocation {
  recipientId: mongoose.Types.ObjectId;
  quantity: number;
}

interface IOrderItem {
  order: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  quantity: number;
  allocations: IAllocation[];
  discountForProducts: number;
  totalAmount: number;
}

const allocationSchema = new mongoose.Schema(
  {
    recipientId: {
      type: mongoose.Schema.Types.ObjectId, // points to order.recipients[_id]
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const orderItemSchema = new mongoose.Schema<IOrderItem>(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },

    // total quantity user bought for this product
    quantity: { type: Number, required: true, min: 1 },

    // how that quantity is split between recipients
    allocations: {
      type: [allocationSchema],
      default: [],
    },

    discountForProducts: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Optional safety check: sum(allocations) == quantity
orderItemSchema.pre('validate', function (this: IOrderItem, next: (err?: CallbackError) => void) {
  if (this.allocations && this.allocations.length > 0) {
    const totalAllocated = this.allocations.reduce(
      (sum: number, a: IAllocation) => sum + (a.quantity || 0),
      0
    );
    if (totalAllocated !== this.quantity) {
      return next(
        new Error('Allocated quantity must equal item quantity') as CallbackError
      );
    }
  }
  next();
});

export default mongoose.model('OrderItem', orderItemSchema);
