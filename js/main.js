$( document ).ready(function() {
    $( '#ri-grid' ).gridrotator( {
        rows : 4,
        columns : 8,
        maxStep : 4,
        interval : 2100,
        w1024 : {
            rows : 5,
            columns : 6
        },
        w768 : {
            rows : 5,
            columns : 5
        },
        w480 : {
            rows : 6,
            columns : 4
        },
        w320 : {
            rows : 7,
            columns : 4
        },
        w240 : {
            rows : 7,
            columns : 3
        },
    });
    // var tmp = $("source");
    // console.log("Hello");
    // console.log(tmp);
    // tmp.load();
    // console.log("LOADED");
    // tmp.pause();

    var myAudio1 = document.getElementById("audio1");
myAudio1.play();
});