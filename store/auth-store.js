import create from 'zustand';

const useAuthStore = create((set) => ({
  isLogedIn: null,
  setIsLogedIn: (value) => {
    if (value) {
      set({ isLogedIn: true });
    } else {
      set({ isLogedIn: false });
    }
  },
}));

export default useAuthStore;
