import React from 'react'
import * as Style from '../../styledComponents/progressbar/CircularProgressbar';
import "./dashboard.css";
const PercentageCard = (props) => {
    const strokeWidth = 2;
    const radius = (100 / 2) - (strokeWidth * 2);
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - props.percentage / 100 * circumference;
    return (
        <Style.MainCard >
            <div className="flip-box">
                <div className="flow flip-box-inner">
                    {/* <div className="flow"> */}
                    <div className="percentage-card-container flip-box-front">
                        <Style.CardHeader >
                            <p className="percentage-header-text-custom">{props.name}</p>
                        </Style.CardHeader>
                        <Style.CardLowerSection
                        >
                            <div className="percent-background-circle">
                                <Style.Container>
                                    <svg
                                        aria-label={"progress"}
                                        aria-valuemax={100}
                                        aria-valuemin={0}
                                        aria-valuenow={props.percentage}
                                        height={150}
                                        role="progressbar"
                                        width={150}
                                        viewBox="0 0 100 100"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >

                                        <Style.Circle
                                            cx="50"
                                            cy="50"
                                            r={radius}
                                            strokeWidth={strokeWidth}
                                        />

                                        <Style.FilledCircle
                                            cx="50"
                                            cy="50"
                                            data-testid="progress-bar-bar"
                                            r={radius}
                                            strokeDasharray={`${circumference} ${circumference}`}
                                            strokeDashoffset={offset}
                                            strokeWidth={strokeWidth}
                                        />

                                    </svg>

                                    <Style.Text data-testid="progress-bar-text" className='percentage-text-custo'>
                                        {props.percentage}%
                                    </Style.Text>

                                </Style.Container>

                            </div>
                        </Style.CardLowerSection>
                    </div>

                    <div className="percentage-card-container flip-box-back">
                        <Style.CardHeader >
                            <p className="percentage-header-text-custom">{props.name}</p>
                        </Style.CardHeader>
                        <Style.CardLowerSectionBack >
                            <div style={{ height: "100%" }}>
                                <Style.CardItems
                                >
                                    <div style={{ width: "70%" }}>
                                        <span className="getting-married-text">Need :</span>
                                    </div>
                                    <Style.CardItemsText >
                                        <div className="item3">
                                            <span className="left">$</span>
                                        </div>
                                        <div className="item4">
                                            <span className="right">{props.need}</span>
                                        </div>
                                    </Style.CardItemsText>
                                </Style.CardItems>
                                <Style.CardItems  >
                                    <div style={{ width: "70%" }}>
                                        <span className="getting-married-text">Have :</span>
                                    </div>
                                    <Style.CardItemsText >
                                        <div className="item3">
                                            <span className="left">$</span>
                                        </div>
                                        <div className="item4">
                                            <span className="right">{props.have}</span>
                                        </div>
                                    </Style.CardItemsText>
                                </Style.CardItems>
                                <Style.CardItems >
                                    <Style.AchievementText >
                                        <span className="getting-married-text">
                                            Achievement Due in:{" "}
                                        </span>
                                    </Style.AchievementText>
                                    <Style.AchievementDays >
                                        <div className="item4">
                                            <span className="right">{props.days} Days </span>
                                        </div>
                                    </Style.AchievementDays>
                                </Style.CardItems>
                            </div>
                        </Style.CardLowerSectionBack>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </Style.MainCard>

    )
}

export default PercentageCard
