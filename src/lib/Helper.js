
class Helpers {
	
    static format_curency(a) {
        a = a+""
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }
    static getQueryParams = ( params, url = window.location.href) => {
  
        let href = url;
        let reg = new RegExp( '[?&]' + params + '=([^&#]*)', 'i' );
        let queryString = reg.exec(href);
        return queryString ? queryString[1] : null;
      };
    static apiUrl(){
        return "http://laravel.sega-group.com/";
    }
    static apiUrlLocal(port=3000){
        return "http://127.0.0.1:"+port+"/";
    }
}

export default Helpers;