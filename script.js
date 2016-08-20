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

function get_url_params() {
    var params = {};
    var query = window.location.search.substring(1);
    if (query.length == 0) {
        return;
    }
    var pairs = query.split('&');
    for (var i = 0; i < pairs.length ; ++i) {
        var pair = pairs[i].split('=');
        pair[0] = make_key_full_text(pair[0]);
        pair[0] = decodeURIComponent(pair[0]);
        pair[1] = decodeURIComponent(pair[1]);
        params[pair[0]] = pair[1];
    }
    return params;
}

function make_key_full_text(key) {
    switch(key) {
        case 'p':
            return 'player';
        case 'h':
            return 'hero';
        case 'd':
            return 'date';
        case 'm':
            return 'map';
        case 't':
            return 'turn';
        default:
            return false;
    }
}

function play_movie() {
    var index;
    var info;
    var valid;
    var tried = 0;
    var params = get_url_params();

    while (true) {
        index = Math.floor(meta.length * Math.random());
        info = meta[index];

        if (params == null) {
            // 파라미터가 없으면, 같은 플레이어 영상 반복만 안되게
            if (prev_player != info.player) {
                prev_player = info.player;
                break;
            }
        } else {
            // 파라미터가 있으면, 모두 만족하는 영상을 찾는다.
            valid = true;
            for (var key in params) {
                if (info[key] != params[key]) {
                    valid = false;
                }
            }
            if (valid == true || tried > 1000) {
                break;
            }
        }
        tried += 1;
    }

    // 재생하고
    $('#potg').attr('src', encodeURI('POTG/' + info.filename));

    // 메타 정보를 출력한다.
    $('.player').text(info.player);
    $('.hero').text(info.hero);
    $('.date').text(info.date);
    $('.map').text(info.map);
    $('.turn').text(info.turn);
}
