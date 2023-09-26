import React, {Fragment, useCallback, useEffect, useState} from "react";
import {SportTicketResponse} from "../../models/TicketModel";
import {TicketService} from "../../services/Ticket";
import Utils from "../../classes/Utils";
import {toast} from "react-toastify";
import Loading from "../../components/ui/Loading";
import SportTicketList from "./list/SportTicketList";
import classNames from "classnames";
import {Search} from "@mui/icons-material";
import {CircularProgress} from "@mui/material";


const SportAllTicketList = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [sportTickets, setSportTickets] = useState<SportTicketResponse[]>([]);

    const getAllSportTickets = useCallback(() => {
        const ticketService = new TicketService()
        ticketService.getAllSportTicketsByUser()
            ?.then((res) => {
                console.log(res.data)
                setSportTickets(res.data);
                Utils.sleep(300).then(() => setIsLoading(false));
            })
            .catch((error) => {
                console.log(error.response.data)
                toast.error(error.response.data.message);
                Utils.sleep(300).then(() => setIsLoading(false));
            })
    }, [])

    const getAllSportTicketsLike = useCallback((event: { target: { value: string; }; }) => {
        setIsLoading(true)
        const ticketService = new TicketService()
        ticketService.getAllSportTicketsByUserLike(event.target.value)
            ?.then((res) => {
                console.log(res.data)
                setSportTickets(res.data);
                Utils.sleep(300).then(() => setIsLoading(false));
            })
            .catch((error) => {
                console.log(error.response.data)
                toast.error(error.response.data.message);
                Utils.sleep(300).then(() => setIsLoading(false));
            })
    }, [])

    useEffect(() => {
        getAllSportTickets()
    }, [getAllSportTickets]);

    return (
        <>
            <div className={"flex flex-col gap-3"}>
                <div className="relative flex flex-row px-1">
                    <input
                        onChange={getAllSportTicketsLike}
                        type="text"
                        className={classNames(
                            "bg-green-primary-300 p-2 text-green-primary-900 w-full",
                            "leading-tight focus:outline-none peer placeholder-gray-dark border-2",
                            "rounded-xl border-t border-b border-r border-l pl-10",
                            "border-transparent before:bg-green-primary-100 focus:bg-green-primary-200 focus:shadow-md focus:border-green-primary-900"
                        )}
                        placeholder={"Search ticket by name or category"}
                    />
                    <div
                        tabIndex={-1}
                        className={classNames(
                            "select-none absolute left-2 top-2 flex bg-green-primary-300 rounded-l-xl text-green-primary-700 justify-center items-center",
                            "",
                            "peer-focus:bg-green-primary-200",
                        )}
                    >
                        <Search/>
                    </div>
                </div>
                {
                    !isLoading?
                        <SportTicketList sportTickets={sportTickets}/>
                        :
                        <Loading/>
                }
            </div>
        </>
    );
}

export default SportAllTicketList;
