var meta;
var prev_player = '';

$(document).ready(function() {
    $.getJSON('meta.json', function(data) {
        meta = data;
    }).complete(function() {
        play_movie();
    });

    $('#potg').on('ended', function() {
        play_movie();
    });
});

function play_movie() {
    var index;
    var info;
    
    while (true) {
        index = Math.floor(meta.length * Math.random());
        info = meta[index];
        
        if (prev_player != info.player) {
            prev_player = info.player;
            break;
        }
    }
    
    // 재생하고
    $('#potg').attr('src', encodeURI('POTG/' + info.filename));

    // 메타 정보를 출력한다.
    $('.player').text(info.player);
    $('.character').text(info.character);
    $('.date').text(info.date);
    $('.map').text(info.map);
    $('.turn').text(info.turn);
}
