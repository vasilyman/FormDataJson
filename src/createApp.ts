const createApp = (container: string, app: Node) => {
    const containerEl = document.querySelector(container);

    if (!containerEl) throw new Error('container not found');

    containerEl.replaceWith(app);
};

export default createApp;
