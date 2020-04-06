import React from 'react';
class Success extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          menus : [],
        };
    }
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="color font-weight-bold text-center">
                            CHÚC MỪNG QUÝ KHÁCH ĐÃ ĐẶT HÀNG THÀNH CÔNG, CẢM ƠN QUÝ KHÁCh ĐÃ ỦNG HỘ
                        </h3>
                        <h3 className="color font-weight-bold text-center">
                            CHÚNG TÔI SẼ LIÊN LẠC SỚM VỚI QUÝ KHÁCH ĐỂ XÁC NHẬN ĐƠN HÀNG
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
}
export default Success;