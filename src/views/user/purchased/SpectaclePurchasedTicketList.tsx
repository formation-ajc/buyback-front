import React, {useCallback, useEffect, useState} from 'react';
import {TicketService} from "../../../services/Ticket";
import {toast} from "react-toastify";
import {SpectacleTicketResponse} from "../../../models/TicketModel";
import TicketSpectacleCard from "../../../components/ui/TicketSpectacleCard";
import moment from "moment";
import classNames from "classnames";

const SpectaclePurchasedTicketList = () => {

    const [spectacleTickets, setSpectacleTickets] = useState<SpectacleTicketResponse[]>([]);

    const getPurchasedSpectacleTickets = useCallback(() => {
        const ticketService = new TicketService()
        ticketService.getPurchasedSpectacleTicketsByUser()
            ?.then((res) => {
                console.log(res.data)
                setSpectacleTickets(res.data);
            })
            .catch((error) => {
                console.log(error.response.data)
                toast.error(error.response.data.message);
            })
    }, [])

    useEffect(() => {
        getPurchasedSpectacleTickets()
    }, [getPurchasedSpectacleTickets]);

    return (
        <>
            <div
                className={
                    classNames(
                        "flex-1 bg-green-primary-50 flex flex-wrap gap-3 p-5",
                        !spectacleTickets.length?"justify-center items-center":"",
                    )}
            >
                {
                    spectacleTickets.length ?
                    spectacleTickets.map((spectacleTicket, index)=> {
                        return (
                            <TicketSpectacleCard
                                key={index}
                                id={spectacleTicket.id.toString()}
                                label={spectacleTicket.name}
                                price={spectacleTicket.price.toString()}
                                type={"spectacle"}
                                category={spectacleTicket.category.name}
                                date={moment(spectacleTicket.startDate, "YYYY-MM-DD")}
                                city={spectacleTicket.address.name}
                                seller={spectacleTicket.seller.firstname + " " + spectacleTicket.seller.lastname}
                            />
                        )
                    })
                    :
                        <div className={"rounded-3xl p-5 flex justify-center items-center w-full text-green-primary-500 text-5xl font-semibold bg-green-primary-100"}>No ticket</div>

                }
            </div>
        </>
    );
}

export default SpectaclePurchasedTicketList;
