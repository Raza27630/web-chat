import { Pipe, PipeTransform } from '@angular/core';
import { AvatarService } from './api/avatar.service';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser'
@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {
  constructor(private readonly avatarService: AvatarService,
    private readonly domSanitizer: DomSanitizer) { }

  transform(url: string) {
    return this.avatarService.getAvatar(url).pipe(map((blob) => {
      const result = this.arrayBufferToBase64(blob);
      return this.domSanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${result}`);
    }));
  }
  arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

}
