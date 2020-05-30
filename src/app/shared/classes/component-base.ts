import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

export class ComponentBase implements OnDestroy {
    private subscriptions: Subscription[] = [];

    // -------------------------------------------------------------------------------------------------------------------
    protected rxs(s: Subscription): void {
        this.subscriptions.push(s);
    }

    // -------------------------------------------------------------------------------------------------------------------
    ngOnDestroy() {
        this.subscriptions.forEach(x => x.unsubscribe());
    }
}
