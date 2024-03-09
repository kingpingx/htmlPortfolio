// const term = $('#term').terminal(function(command) {
//   command = command.trim()
//   if (!command) {
//       return;
//   }
//   const cmd = $.terminal.split_command(command);
//   if (cmd.name === 'help') {
//       this.echo('available commands: [[;white;]echo], [[;white;]help]')
//   } else if (cmd.name === 'echo') {
//       if (cmd.rest) {
//           const msg = $.terminal.escape_formatting(cmd.rest);
//           this.echo(`[[;white;blue]${msg}]`);
//       }
//   } else {
//       this.error('Invalid command');
//   }
// }, {
//   enabled: false,
//   name: '3d',
//   exit: false
// });

const { terminal: geometry } = term.geometry();

term.hide();

/*
* calculation of transform matrix taken from:
* https://stackoverflow.com/a/36217808/387194
*/
// Computes the matrix3d that maps src points to dst.
function compute_transform(src, dst) {
// src and dst should have length 4 each
var count = 4;
var a = []; // (2*count) x 8 matrix
var b = []; // (2*count) vector

for (var i = 0; i < 2 * count; ++i) {
  a.push([0, 0, 0, 0, 0, 0, 0, 0]);
  b.push(0);
}

for (var i = 0; i < count; ++i) {
  var j = i + count;
  a[i][0] = a[j][3] = src[i][0];
  a[i][1] = a[j][4] = src[i][1];
  a[i][2] = a[j][5] = 1;
  a[i][3] = a[i][4] = a[i][5] =
    a[j][0] = a[j][1] = a[j][2] = 0;
  a[i][6] = -src[i][0] * dst[i][0];
  a[i][7] = -src[i][1] * dst[i][0];
  a[j][6] = -src[i][0] * dst[i][1];
  a[j][7] = -src[i][1] * dst[i][1];
  b[i] = dst[i][0];
  b[j] = dst[i][1];
}

var x = numeric.solve(a, b);
// matrix3d is homogenous coords in column major!
// the z coordinate is unused
var m = [
  x[0], x[3], 0, x[6],
  x[1], x[4], 0, x[7],
  0, 0, 1, 0,
  x[2], x[5], 0, 1
];
return "matrix3d(" + m.join(',') + ')';
}

// Collect the four corners by user clicking in the corners:

var points = [];
// map flatten the array
$('.point').each(function() {
  const { left, top } = $(this).position();
  points.push([left, top]);
});

transform_terminal();
term.show();
const $body = $('body');
$('.point').each(function(i) {
  var drag = false;
  var [container] = $('.laptop');
  var $point = $(this).mousedown(function() {
      drag = true;
      $body.addClass('drag');
  });
  $(document).on('mouseup', function() {
      drag = false;
      $body.removeClass('drag');
  }).on('mousemove', function(event) {
      if (drag) {
          var box = container.getBoundingClientRect();
          var x = event.clientX - box.left;
          var y = event.clientY - box.top;
          points[i] = [x, y];
          $point.css({
              left: x,
              top: y
          });
          transform_terminal();
      }
  });
});

function transform_terminal() {
  var w = geometry.width,
      h = geometry.height;
  var transform = compute_transform(
      [
          [0, 0],
          [w, 0],
          [w, h],
          [0, h]
      ],
      points
  );
  function format(klass, left, top) {
      return `
.${klass} {
 left: ${left}px;
 top: ${top}px;
}`.trim();
  }
  const point_css = $('.point').map(function() {
      var {left, top} = $(this).position();
      var klas = $(this).attr('class').replace(/point /, ''); 
      return format(klas, left, top);
  }).get().join('\n');
  $('.output pre').html(`
.terminal {
  transform: ${transform};
}
/* optional control points */
${point_css}`.trim())
  term.css({
      '--transform': transform
  });
}
function debounce(func, timeout = 300){
let timer;
return (...args) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
      func.apply(this, args);
  }, timeout);
};
}

$('#file').on('input', debounce(function() {
  input.src = file.value;
}));
$('#points').on('change', function() {
  $('.laptop').toggleClass('points');
});
$('#open').click(function() {
  document.body.classList.add('sidebar');
});
$('#close').click(function() {
  document.body.classList.remove('sidebar');
});