var Random = (function () {
    function Random() {
    }
    Random.range = function (min, max) {
        if (typeof max === "undefined") { max = 0; }
        if (min == max)
            return min;

        //swap
        if (min > max) {
            var tmp = max;
            max = min;
            min = tmp;
        }
        return min + Math.round(Math.random() * (max - min));
    };

    Random.color = function () {
        return "#" + Random.range(0, 255).toString(16) + Random.range(0, 255).toString(16) + Random.range(0, 255).toString(16);
    };
    return Random;
})();
;
//# sourceMappingURL=Random.js.map
