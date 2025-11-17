import helmet from "helmet";

export const getHelmetConfig = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    // Base configuration for APIs
    const baseConfig = [
        helmet.contentSecurityPolicy({ directives: {} }), // Disable for JSON APIs
        helmet.crossOriginEmbedderPolicy({ policy: "require-corp" }), // Not needed for JSON APIs
        helmet.hidePoweredBy(), // Always hide server info
        helmet.noSniff(), // Always prevent MIME sniffing
        helmet.frameguard({ action: "deny" }), // Prevent clickjacking
        // Prevents cross window attacks by separating the API from any
        // other websites that could cause potential data leaks
        helmet.crossOriginOpenerPolicy({ policy: "same-origin" }),
    ];

    if (isDevelopment) {
        return helmet({
            ...baseConfig,
            hsts: false, // No HTTPS enforcement in development
        });
    }

    // Production gets full security
    return helmet({
        ...baseConfig,
        hsts: {
            maxAge: 31536000, // 1 year
            includeSubDomains: true,
            preload: true,
        },
        referrerPolicy: { policy: "no-referrer" },
    });
};
