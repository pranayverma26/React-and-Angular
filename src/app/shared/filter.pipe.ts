import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(traningMaterial: any[], filterVAlue: string): any {
    return traningMaterial.filter((i) =>
      i.heading.toLowerCase().includes(filterVAlue)
    );
  }
}
