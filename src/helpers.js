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
                <p style='font-size:25px;'> descripcion: "+curso.descripcion+"</p></center>";

   return texto;

});

hbs.registerHelper('inscribir', (id, nombreE, curso, telefono, correo) => {


    listarE();
    let vid = listaEstudiante.filter(dato => dato.id == id);
    let vc = vid.filter(dt => dt.curso == curso);
    console.log(vc);
    if(vc == 0){
    let ins = {
      id: id,
      nombre: nombreE,
      curso:curso,
      telefono: telefono,
      correo: correo
    };

    console.log(ins);

    listaEstudiante.push(ins);
    return guardarE();
  }else{
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

  })


