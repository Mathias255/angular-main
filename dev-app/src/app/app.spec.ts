import {TestBed} from '@angular/core/testing';
import {App} from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the learning dashboard', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Aprende Angular.');
  });

  it('should filter the example topics by category and search text', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    compiled.querySelector<HTMLButtonElement>('.primary-button')?.click();
    await fixture.whenStable();
    expect(compiled.querySelectorAll('.topic-card')).toHaveLength(6);

    const intermediateFilter = Array.from(compiled.querySelectorAll<HTMLButtonElement>('.filter-chip')).find(
      (button) => button.textContent?.trim() === 'Intermedio',
    );
    intermediateFilter?.click();
    await fixture.whenStable();
    expect(compiled.querySelectorAll('.topic-card')).toHaveLength(3);

    const search = compiled.querySelector<HTMLInputElement>('input[type="search"]');
    if (!search) {
      throw new Error('Expected the topic search input to be rendered');
    }
    search.value = 'servicios';
    search.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(compiled.querySelectorAll('.topic-card')).toHaveLength(1);
    expect(compiled.querySelector('.topic-card h3')?.textContent).toContain('Servicios');
  });

  it('should show details for a selected topic', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    compiled.querySelector<HTMLButtonElement>('.primary-button')?.click();
    await fixture.whenStable();
    compiled.querySelector<HTMLButtonElement>('[aria-label="Ver ruta: Componentes"]')?.click();
    await fixture.whenStable();

    expect(compiled.querySelector('.topic-detail h3')?.textContent).toBe('Componentes');
  });
});
