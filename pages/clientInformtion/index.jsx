import React from 'react'
import { ClientInfo } from '../../components/ClientInfo/ClientInfoConstants';
import PageTitle from '../../components/ClientInfo/PageTitle';
import * as Style from "../../components/styledComponents/clientInfoStyles/clientInfo";
import Image from 'next/image';
import Link from "next/link";
const index = () => {

    return (
        <React.Fragment>
            <PageTitle title="Client Information" />
            <Style.Cards className=''>
                {ClientInfo.map((item, index) => (
                    <Link key={index} href={item.href} style={{ width: "25%" }}>
                        <div className={'button-wrap-goals'}>
                            <div >
                                <div className=''>
                                    <Image src={item.img} alt={item.title} height='100' width='100' />
                                </div>
                                <Style.CardsTitle>{item.title}</Style.CardsTitle>
                            </div>
                        </div>
                    </Link>
                ))}
            </Style.Cards>
        </React.Fragment>
    )
}

export default index
