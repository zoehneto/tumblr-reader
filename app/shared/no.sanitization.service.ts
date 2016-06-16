import { Injectable, provide } from '@angular/core';
import { DomSanitizationService, SecurityContext } from '@angular/platform-browser';

@Injectable()
export class NoSanitizationService {
    sanitize(ctx: SecurityContext, value: any): string {
        return value;
    }
}

export const NO_SANITIZATION_PROVIDERS: any[] = [
    provide(DomSanitizationService, { useClass: NoSanitizationService }),
];