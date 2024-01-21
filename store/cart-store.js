import create from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  totalAmount: 0,

  addItem: (product, quantity = 1) => {
    set((state) => {
      // Check if the product is already in the cart
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        // If the product already exists in the cart, update the quantity
        const updatedItems = state.items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
        return {
          items: updatedItems,
          totalAmount: state.totalAmount + product.price * quantity,
        };
      } else {
        // If the product is not in the cart, add it
        return {
          items: [...state.items, { ...product, quantity }],
          totalAmount: state.totalAmount + product.price * quantity,
        };
      }
    });
  },

  removeItem: (productId) => {
    set((state) => {
      const itemToRemove = state.items.find((item) => item.id === productId);
      if (!itemToRemove) {
        return state;
      }

      const updatedItems = state.items.filter((item) => item.id !== productId);
      const updatedTotalAmount = state.totalAmount - itemToRemove.price * itemToRemove.quantity;

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    });
  },

  incrementQuantity: (productId) => {
    set((state) => {
      const updatedItems = state.items.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
      const updatedTotalAmount = state.totalAmount + updatedItems.find((item) => item.id === productId).price;

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    });
  },

  decrementQuantity: (productId) => {
    set((state) => {
      const itemToUpdate = state.items.find((item) => item.id === productId);

      if (!itemToUpdate) {
        return state;
      }

      // If quantity is 1, remove the item instead of decrementing
      if (itemToUpdate.quantity === 1) {
        return {
          items: state.items.filter((item) => item.id !== productId),
          totalAmount: state.totalAmount - itemToUpdate.price,
        };
      }

      const updatedItems = state.items.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item));
      const updatedTotalAmount = state.totalAmount - itemToUpdate.price;

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    });
  },

  clearCart: () => {
    set({
      items: [],
      totalAmount: 0,
    });
  },
}));

export default useCartStore;
