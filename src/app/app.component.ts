import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFile: File | null = null;
  datos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.consultar(); 
  }
  
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  consultar() {
    this.http.get("http://localhost:4000/mi-api-rest/consultarArchivo").subscribe((data) => {this.datos = data as any[]; console.log(this.datos);}, (error => {console.log(error);}));
  }

  onFileSelected() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('nameArchivo', this.selectedFile, this.selectedFile.name);

      this.http.post('http://localhost:4000/mi-api-rest/RegistrarArchivo', formData)
        .subscribe(
          (response) => {
            console.log('Archivo subido exitosamente:', response);
          },
          (error) => {
            console.log('Error al subir el archivo:', error);
          }
        );
    } else {
      console.log('Ningún archivo seleccionado.');
    }
  }
}
