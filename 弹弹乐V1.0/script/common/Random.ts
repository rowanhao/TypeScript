class Random {
    public static range(min: number, max: number = 0) {
        if (min == max)
            return min;
        //swap
        if (min > max) {
            var tmp = max;
            max = min;
            min = tmp;
        }
        return min + Math.round(Math.random() * (max - min));
    }
};