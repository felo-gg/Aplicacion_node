  const hbs = require('hbs');
  const fs = require('fs');
  const swal = require('sweetalert2');



  listaCursos = [];

  const listarC = () => {
    try {
      listaCursos = require('./listaCursos.json');
    } catch(error){
        listaCursos = [];
      }
    }

    const listarE = () => {
      try {
        listaEstudiante = require('./listaEstudiante.json');
      } catch(error){
          listaEstudiante = [];
        }
      }

  const guardarC = () => {
    let curso = JSON.stringify(listaCursos);
    fs.writeFile('src/listaCursos.json', curso, (err) => {
      if(err) throw (err);
      estado = "false";
    })
    console.log("Curso guardado");
      estado = "true";

        return estado;
  }

  const guardarE = () => {
    let insc = JSON.stringify(listaEstudiante);
    fs.writeFile('src/listaEstudiante.json', insc, (err) => {
      if(err) throw (err);

      estado = "false";
    })
    console.log("Estudiante guardado");
      estado = "true";

        return estado;
  }

hbs.registerHelper('crear_curso', (id, nombre_curso, modalidad, valor, duracion, descripcion) => {

      if (valor==0) {
        valor = 'gratis';
      }


      if (modalidad == undefined) {modalidad = '-';}

      if (duracion == '') {duracion = '-';}

    listarC();
    let vid = listaCursos.find(dato => dato.id == id);
    let  vnc= listaCursos.find(dato => dato.nombre_del_curso == nombre_curso);
    if(vid == undefined){
      if(vnc == undefined){
    let curso = {
      id : id,
      nombre_del_curso: nombre_curso,
      modalidad: modalidad,
      valor: valor,
      duracion: duracion,
      descripcion: descripcion,
      estado: 'Disponible'
    };

    listaCursos.push(curso);
    return guardarC();
  }else {
    return false;
  }
  }else{
    return false;
  }
});

hbs.registerHelper('Mostrar', () => {
  listarC();

  let filtro = listaCursos.filter(cs => cs.estado == 'Disponible');

    let texto = "<table>\
    <thead>\
    <th> Nombre del curso </th>\
    <th> Valor </th>\
    <th> Descripcion </th>\
     <th> Ver detalles </th>\
    </thead>\
    <tbody>";
    filtro.forEach(curso => {

      texto = texto +
        '<tr>'+
        '<td>' +  curso.nombre_del_curso + '</td>' +
        '<td>' + curso.valor + '</td>' +
        '<td>' + curso.descripcion + '</td>'+
        "<td><button class='detalle'><a href='detalles?id="+curso.id+"'> detalles </a></button></td></tr>"


    });

    texto= texto+'</tbody></table>'


  return texto;
});


hbs.registerHelper('detalles', id => {

  
   listarC();


    let curso=listaCursos.find(dato => dato.id == id);

   let texto = "<center><h2 style=' width:60%; padding:2px; margin:auto; margin-top:30px; background:#236F1B; color: #BABABA;' >"+curso.nombre_del_curso+"</h2>\
                <br>\
                <p style='font-size:25px;'> Modalidad: "+curso.modalidad+" </p>\
                <p style='font-size:25px;'> Duracion: "+curso.duracion+" horas </p>\
                <p style='font-size:25px;'> Valor: "+curso.valor+" </p>\
                <p style='font-size:25px;'> Descripcion: "+curso.descripcion+"</p></center>";

   return texto;

});

hbs.registerHelper('inscribir', (id, nombreE, curso, telefono, correo) => {


    listarE();
    let vid = listaEstudiante.filter(dato => dato.id == id);
    let vc = vid.find(dt => dt.curso == curso);
    
    if(vc == undefined){
    let ins = {
      id: id,
      nombre: nombreE,
      curso:curso,
      telefono: telefono,
      correo: correo
    };

    listaEstudiante.push(ins);
    return guardarE();
    console.log("Estudiante Guardado");
  }else{
      console.log("El estudiante NO se a Guardado");
    return false;
  }
});

  hbs.registerHelper('cursos', () =>{

    listarC();

  let filtro = listaCursos.filter(cs => cs.estado == 'Disponible');
 let texto
   
    filtro.forEach(curso => {

       texto = texto + '<option value='+curso.nombre_del_curso+'>' +  curso.nombre_del_curso + '</option>';
    });

    return texto;

  });


  hbs.registerHelper('MostrarE', () => {
  listarE();
  listarC();

  let filtro = listaCursos.filter(cs => cs.estado == 'Disponible');

    let texto = `<div style="margin-top:8px;" class="accordion" id="accordionExample">\n`;
    let i=1;
    filtro.forEach(curso => {

texto = texto +`<div class="card">
                  <div class="card-header" id="heading${i}">
                    <h2 class="mb-0">
                      <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                        ${curso.nombre_del_curso}
                      </button>
                    </h2>
                  </div>
                  <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                    <div class="card-body">
                      <table>
                        <thead>
                          <th> Nombre del estudiante </th>
                          <th> D.I </th>
                          <th> Correo </th>
                          <th> Eliminar </th>
                        </thead>
                        <tbody>`;

      let filtro2=listaEstudiante.filter(es => es.curso == curso.nombre_del_curso);
      filtro2.forEach(estudiante => {
      texto = texto + 
                          `<tr>
                          <td>${estudiante.nombre}</td> 
                          <td>${estudiante.id}</td> 
                          <td>${estudiante.correo}</td>
                          <td><button class='detalle'><a href='eliminar?id=${estudiante.id}&nombre_curso=${curso.nombre_del_curso}'> Eliminar </a></button></td></tr>`;


      })
      texto = texto+`
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>`; 
         
i=i+1;
    });

    texto=texto+'</div>';


  return texto;
});

  hbs.registerHelper('eliminar', (id, nombre_curso) => {
    listarE();
    console.log(id);
    console.log(nombre_curso);
    let nuevo=[];
    
    listaEstudiante.forEach(est =>{

      if ((est.id != id) || (est.curso != nombre_curso)) {

        let nuv = {
      id: est.id,
      nombre: est.nombre,
      curso: est.curso,
      telefono: est.telefono,
      correo: est.correo
    };

    nuevo.push(nuv);
      }

      listaEstudiante = nuevo;

      guardarE();

      

    })

    
  })


