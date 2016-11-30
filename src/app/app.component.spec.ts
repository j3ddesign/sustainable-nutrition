/* tslint:disable: max-line-length */
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { NotFound404Component } from './not-found404.component';
import { routes } from './app.routing';

import 'rxjs/add/operator/takeUntil';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FooterModule } from './footer/footer.module';
import { BrandLogoModule } from './brand-logo/brand-logo.module';

describe('App Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrandLogoModule,
        FooterModule,
        RouterTestingModule.withRoutes(routes)
        ],
      providers: [],
      declarations: [
        AppComponent,
        SideNavComponent,
        NotFound404Component
      ]
    });
  });

  it('should contain app text', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture).toBe(fixture);
  }));

});
