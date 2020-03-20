
class Helpers {
	
    static format_curency(a) {
        a = a+""
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }
}

export default Helpers;