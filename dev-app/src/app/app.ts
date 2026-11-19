import {Component, computed, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';

type TopicCategory = 'Fundamentos' | 'Intermedio';
type CategoryFilter = 'Todos' | TopicCategory;

interface Topic {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: TopicCategory;
  lessons: number;
  duration: string;
  details: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly mostrarEjemplos = signal(false);
  protected readonly searchQuery = signal('');
  protected readonly selectedCategory = signal<CategoryFilter>('Todos');
  protected readonly selectedTopic = signal<Topic | null>(null);

  protected readonly categories: readonly CategoryFilter[] = ['Todos', 'Fundamentos', 'Intermedio'];

  protected readonly topics: readonly Topic[] = [
    {
      id: 'componentes',
      icon: 'A',
      title: 'Componentes',
      description: 'Crea piezas reutilizables para construir tu aplicación.',
      category: 'Fundamentos',
      lessons: 4,
      duration: '20 min',
      details: 'Aprende a definir componentes, mostrar datos en la plantilla y organizar una interfaz en piezas reutilizables.',
    },
    {
      id: 'data-binding',
      icon: '{ }',
      title: 'Data binding',
      description: 'Conecta los datos de tu aplicación con la interfaz.',
      category: 'Fundamentos',
      lessons: 3,
      duration: '15 min',
      details: 'Explora la interpolación, el binding de propiedades y la respuesta a eventos desde tus plantillas.',
    },
    {
      id: 'directivas',
      icon: '↳',
      title: 'Plantillas y control de flujo',
      description: 'Muestra contenido dinámico con la sintaxis moderna.',
      category: 'Fundamentos',
      lessons: 4,
      duration: '25 min',
      details: 'Practica el control de flujo con @if y @for para construir plantillas claras y reactivas.',
    },
    {
      id: 'formularios',
      icon: '✓',
      title: 'Formularios',
      description: 'Recopila información y valida las entradas.',
      category: 'Intermedio',
      lessons: 5,
      duration: '30 min',
      details: 'Crea formularios, responde a las interacciones y ofrece mensajes de validación útiles.',
    },
    {
      id: 'servicios',
      icon: '◇',
      title: 'Servicios e inyección',
      description: 'Comparte lógica y datos entre componentes.',
      category: 'Intermedio',
      lessons: 4,
      duration: '25 min',
      details: 'Separa la lógica de tu interfaz y aprende cómo Angular proporciona dependencias a tus componentes.',
    },
    {
      id: 'routing',
      icon: '↗',
      title: 'Navegación',
      description: 'Organiza las vistas de tu app con rutas.',
      category: 'Intermedio',
      lessons: 4,
      duration: '25 min',
      details: 'Configura rutas y permite que las personas naveguen entre distintas vistas de tu aplicación.',
    },
  ];

  protected readonly filteredTopics = computed(() => {
    const query = this.searchQuery().trim().toLocaleLowerCase();
    const category = this.selectedCategory();

    return this.topics.filter((topic) => {
      const matchesCategory = category === 'Todos' || topic.category === category;
      const matchesQuery =
        query.length === 0 ||
        `${topic.title} ${topic.description} ${topic.category}`.toLocaleLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  });

  protected toggleExamples(): void {
    this.mostrarEjemplos.update((visible) => !visible);
    this.selectedTopic.set(null);
  }

  protected setCategory(category: CategoryFilter): void {
    this.selectedCategory.set(category);
    this.selectedTopic.set(null);
  }

  protected searchTopics(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.searchQuery.set(event.target.value);
      this.selectedTopic.set(null);
    }
  }

  protected selectTopic(topic: Topic | null): void {
    this.selectedTopic.set(topic);
  }
}
