export const ToastManager = {
  toasts: new Map(),
  listeners: new Map(),
  addToast(toast: any) {
    const id = Date.now();
    this.toasts.set(id, { id, ...toast });
    this.onChange();
    return id;
  },

  clearAllToast() {
    this.toasts.clear();
    this.onChange();
  },

  removeToast(id: any) {
    this.toasts.delete(id);
    this.onChange();
  },
  replaceToast(id: any, toast: any) {
    if (this.isActive(id)) {
      this.toasts.set(id, { ...this.toasts.get(id), ...toast });
      this.onChange();
      return id;
    } else {
      return this.addToast(toast);
    }
  },
  addListener(cb: any) {
    this.listeners.set(cb, cb);
  },
  removeListener(cb: any) {
    this.listeners.delete(cb);
  },
  isActive(id: any) {
    return this.toasts.has(id);
  },
  onChange() {
    const toasts = Array.from(this.toasts.values());
    this.listeners.forEach((listener) => listener(toasts));
  },
};
