package com.page.faq.client;

public class IAException extends RuntimeException {

    private final int statusCode;
    private final boolean timeout;

    public IAException(String mensaje, int statusCode) {
        this(mensaje, statusCode, false, null);
    }

    public IAException(
            String mensaje,
            int statusCode,
            Throwable causa
    ) {
        this(mensaje, statusCode, false, causa);
    }

    public IAException(
            String mensaje,
            int statusCode,
            boolean timeout,
            Throwable causa
    ) {
        super(mensaje, causa);
        this.statusCode = statusCode;
        this.timeout = timeout;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public boolean esTimeout() {
        return timeout;
    }

    public boolean esRecuperable() {
        return timeout
                || statusCode == 429
                || statusCode >= 500;
    }
}