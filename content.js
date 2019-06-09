var url = ''
var tags = []

function getQueue() {
    tags = []
    var html = "";
    $.get('https://www.crunchyroll.com/home/queue').done(function(data){
        result = $('<ul />').append(data).find('.queue-item');
        result.each(function(){
            let obj = {
                episode: +$(this).find(".series-data").text().split("–")[0].trim().split(" ").pop(),
                title: $(this).find(".series-title").text(),
                isNew: (+$(this).find(".episode-progress")[0].style.width.replace("%", '') <= "80"),
                thumbnail: $(this).find(".episode-img img")[0].outerHTML,
                link: $(this).find(".block-link").attr('href')
            }
            $li = `<li><a href='${obj.link}'>`
            $li+=`<div class='continue-title'>${obj.title}: Episode ${obj.episode}</div>`
            $li +=`<div class='continue-thumbnail'>${obj.thumbnail}</div>`
            $li += `</a></li>`

            if(obj.isNew && obj.episode > 1) {
                tags.push($li);
                html += $li
            }
        });
        if($('#contineList')){
            $('#contineList').remove();
        }
        $("header").after(`<ul id='contineList' class='continue'>${html}</ul>`);
    });
}
getQueue()