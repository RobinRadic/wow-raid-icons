(function(factory){
    factory(jQuery);
}(function($){

    var raids = [
        "BWL", "AQ20", "AQ40", // Classic
        "Kara", "Gruul", "Mag", "ZA", "SSC", "TK", "MH",  "BT", "SWP", // Burning crusade
        "Naxx", "OS", "VoA", "EoE", "Uld", "ToC", "Ony", "ICC", "RS", // Wrath of the Lich King
        "BH", "BoT", "BWD", "ToFW", "FL", "DS", // Cataclysm
        "MV", "HoF", "ToES", "ToT", "SoO", // Mists of Pandaria
        "HM", "MC" // Warlords of Draenor
    ];

    var prefix = 'wri';

    function appendRaidIcons($target, fn){
        $.each(raids, function(i, raid){
            var $icon = $(document.createElement('i')).addClass(prefix + ' ' + prefix + '-' + raid).css('margin', '5px');
            fn($icon, raid, i);
            $target.append($icon);
        })
    }

    appendRaidIcons($('#default'), function($icon, raid, index){

    });
    appendRaidIcons($('#hover'), function($icon, raid, index){
        $icon.addClass(prefix + '-hover');
    });

}));
