import React, { Component } from 'react'
import Trip from '../trip/Trip'
import Destination from '../detination/Destination'

export default class Home extends Component {
    render() {
        return (
            <div>
                <section className="ftco-section ftco-no-pb">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-12 heading-section text-center  mb-5">
                                <span className="subheading">Our Services</span>
                                <h2 className="mb-2">Lên lịch trình du lịch theo sở thích cá nhân</h2>
                            </div>
                        </div>
                        <div className="row d-flex">
                            <div className="col-md-4 d-flex align-self-stretch ">
                                <div className="media block-6 services d-block text-center">
                                    <div className="icon d-flex justify-content-center align-items-center">
                                        <img style={{ width: '70px', height: '70px' }}
                                            src={'https://triphunter.vn/assets/icons/icon_planding_1-498fc51965ac4eeaf09cb257c6a0013a406ae2d504290fc16194f1b03fd3f839.svg'} />
                                    </div>
                                    <div className="media-body py-md-4">
                                        <h3>Tìm điểm đến</h3>
                                        <p>Tìm điểm tham quan, nhà hàng, khách sạn dễ dàng và nhanh chóng nhất.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 d-flex align-self-stretch ">
                                <div className="media block-6 services d-block text-center">
                                    <div className="icon d-flex justify-content-center align-items-center">
                                        <img style={{ width: '70px', height: '70px' }}
                                            src={'https://triphunter.vn/assets/icons/icon_planding_2-1aa4e8b9b5fafac6d00d74b76af29b2507d2348237f438fe33d46e1a26233977.svg'} />
                                    </div>
                                    <div className="media-body py-md-4">
                                        <h3>Dễ dàng tạo lịch trình</h3>
                                        <p>Chỉ cần nhập điểm đi & đến, tự động tạo lịch trình theo sở thích của bạn.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 d-flex align-self-stretch ">
                                <div className="media block-6 services d-block text-center">
                                    <div className="icon d-flex justify-content-center align-items-center">
                                        <img style={{ width: '70px', height: '70px' }}
                                            src={'https://triphunter.vn/assets/icons/icon_planding_3-9a749999bba1966e72741860e7892de3e55fbdea4d2dade5e13a82883eae422b.svg'} />
                                    </div>
                                    <div className="media-body py-md-4">
                                        <h3>Có thể chỉnh sửa, chia sẻ</h3>
                                        <p>Giao diện thân thiện, dễ dàng thêm, xóa, sắp xếp lịch trình và chia sẻ cùng bạn bè tham gia chuyến đi của mình</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ftco-section goto-here">
                    <Trip />
                </section>
                <section className="ftco-section goto-here">
                    <Destination />
                </section>
                {/*end Service */}
                <section className="ftco-section ftco-degree-bg services-section img mx-md-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-12 heading-section text-center  mb-5">
                                <span className="subheading"></span>
                                <h2 className="mb-2">Tạo lịch trình trong 30 giây</h2>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <img className="img" src={"../images/laptop.png"} />
                            </div>
                            <div className='col-md-6' style={{ float: 'left', display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <p className='step'>1</p>
                                    <div className='text-title'>
                                        Tạo lịch trình dễ dàng
                                    </div>
                                    <div>Chỉ cần bạn nhập điểm đi, điểm đến và thời gian, hệ thống sẽ tự động lên lịch trình theo sở thích của bạn trong vòng 30s.</div>
                                </div>
                            </div>
                            <div className='col-md-6' style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <div style={{ paddingLeft: 563 }}><p className='step'>2</p></div>
                                    <div className='text-title' style={{ textAlign: 'right' }}>
                                        Dự trù được chi phí hành trình
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        Hệ thống có thể tính toán và liệt kê ra bảng chi phí bao gồm chỗ ở, thăm quan, ăn uống,
                                        di chuyển,…cho chuyến đi của bạn. Bạn cũng có thể thêm, xoá, sửa các chi phí trong chuyến đi theo ý muốn.
                                        </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <img className="img" src={"../images/laptop.png"} />
                            </div>
                            <div className='col-md-6'>
                                <img className="img" src={"../images/laptop.png"} />
                            </div>
                            <div className='col-md-6' style={{ float: 'left', display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <p className='step'>3</p>
                                    <div className='text-title'>
                                        Lên lịch trình tối ưu
                                    </div>
                                    <div>
                                        Hệ thống sẽ tính toán giúp bạn lên một lịch trình tối ưu nhất về mặt thời cũng như di chuyển từ điểm này sang điểm khác một cách hợp lý nhất. Bạn cũng có thể chỉnh sửa, ghi chú lại những cảm nhận trong chuyến hành trình.Có thể chia sẻ, mời bạn bè tham gia vào lịch trình bạn tạo
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
