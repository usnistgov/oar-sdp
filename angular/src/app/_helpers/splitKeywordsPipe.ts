import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitKeywordsPipe'
})
export class SplitKeywordsPipe implements PipeTransform {
  transform(value: string, separator: string = ';'): string[] {
    return value ? value.split(separator).map(keyword => keyword.trim()) : [];
  }
}
