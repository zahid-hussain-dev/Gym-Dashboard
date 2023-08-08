import React from 'react'
import { useRouter } from 'next/router';
import { Button, RejectButton,AcceptButton } from '../../../components/styledComponents/button/Button';
import * as Style from '../../../components/styledComponents/gymnast/Gymnast';

const ViewId = () => {
    const router = useRouter();
    const Id = router.query.ViewId;
    const tableCell = [
        { id: 1, timeSlote: '9 - 10', child: 'wasiq', coach: 'mudasir' },
        { id: 2, timeSlote: '10 - 11', child: 'shakeel', coach: 'rohab' },
    ];
    return (
        <div>
            ViewId details {Id}
            <Style.SubTitle>Child Listing</Style.SubTitle>
            <Style.TableContainer>
                <Style.TableWrapper>
                    <thead>
                        <Style.TableRow>
                            <Style.TableHead>CHILD</Style.TableHead>
                            <Style.TableHead>ACTIONS</Style.TableHead>

                        </Style.TableRow>
                    </thead>
                    <tbody>
                        {tableCell.map((data, index) => (
                            <Style.TableRow key={index}>
                                <Style.TableCell>{data.child}</Style.TableCell>
                                <Style.TableCell>
                                    <RejectButton onClick={() => { console.log(data.id) }}>Delete</RejectButton>
                                </Style.TableCell>

                            </Style.TableRow>
                        ))}
                    </tbody>
                </Style.TableWrapper>
            </Style.TableContainer>
            <Style.SubTitle style={{marginTop:"1rem"}}>Booking Listing</Style.SubTitle>
            <Style.TableContainer>
                <Style.TableWrapper>
                    <thead>
                        <Style.TableRow>
                            <Style.TableHead>CHILD</Style.TableHead>
                            <Style.TableHead>COACH</Style.TableHead>
                            <Style.TableHead>TIME SLOT</Style.TableHead>
                            <Style.TableHead>ACTIONS</Style.TableHead>

                        </Style.TableRow>
                    </thead>
                    <tbody>
                        {tableCell.map((data, index) => (
                            <Style.TableRow key={index}>
                                <Style.TableCell>{data.child}</Style.TableCell>
                                <Style.TableCell>{data.coach}</Style.TableCell>
                                <Style.TableCell>{data.timeSlote}</Style.TableCell>
                                <Style.TableCell>
                                    <AcceptButton onClick={() => { console.log(data.id) }}>Cancel</AcceptButton>
                                </Style.TableCell>

                            </Style.TableRow>
                        ))}
                    </tbody>
                </Style.TableWrapper>
            </Style.TableContainer>

        </div>
    )
}

export default ViewId
