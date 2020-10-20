$(document).ready(function () {
  consultaAPI("pikachu");
  canvas();
});

$("button").click(function () {
  let pokemon = $("#input").val();
  consultaAPI(pokemon);
});

function consultaAPI(nombrePokemon) {
  $.ajax({
    type: "GET",
    url: `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`,

    success: function (data) {
      $("#pokemon").html(`
      <h3>${data.name}</h3> 
      <h5>weight: ${data.weight}[kg]</h5>
      `);

      let defense = data.stats[2].base_stat;
      let hp = data.stats[0].base_stat;
      let atack = data.stats[1].base_stat;
      let speed = data.stats[5].base_stat;

      canvas(defense, atack, speed, hp);
    },
    dataType: "json",
  });

  // logica de imagen con search

  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`,
    success: function (data) {
      $("#imagen").attr(
        "src",
        data.sprites.other["official-artwork"].front_default
      );
    },
  });
}

// Logica del Selector

$.ajax({
  url: "https://pokeapi.co/api/v2/pokemon/?20&limit=1050",
  success: function (respuesta) {
    respuesta.results.forEach((element) => {
      $("#selector").append(`        
      <option value="${element.url}">${element.name}</option>
      `);
    });
  },
});

// Logica de traer la imagen con selector

$("#selector").change(function () {
  var urlPokemon = $("select[id=selector]").val();

  $.ajax({
    url: urlPokemon,
    success: function (respuesta) {
      $("#imagen").attr(
        "src",
        respuesta.sprites.other["official-artwork"].front_default
      );

      $("#pokemon").html(`
      <h3>${respuesta.name}</h3> 
      <h5>weight: ${respuesta.weight}[kg]</h5>
      `);

      let defense = respuesta.stats[2].base_stat;
      let hp = respuesta.stats[0].base_stat;
      let atack = respuesta.stats[1].base_stat;
      let speed = respuesta.stats[5].base_stat;

      canvas(defense, atack, speed, hp);
    },
  });
});

// Canvas
function canvas(defense, atack, speed, hp) {
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title: {
      text: "Pokemon Stats",
    },
    axisY: {
      title: "Rate",
      suffix: "",
    },
    axisX: {
      title: "Base Stats",
    },
    data: [
      {
        type: "column",
        yValueFormatString: "#,##0.0#",
        dataPoints: [
          { label: "Defense", y: defense },
          { label: "Atack", y: atack },
          { label: "Speed", y: speed },
          { label: "HP", y: hp },
        ],
      },
    ],
  });
  chart.render();
}
