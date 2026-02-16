declare const autoImportResolver: (name?: string) => (componentName: string) => {
    from: string;
    as: string;
    name: string;
} | undefined;
export default autoImportResolver;
