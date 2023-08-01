export const EVENTS = [
    {
        event_id: 1,
        title: "Event 1",
        start: new Date(new Date(new Date().setHours(9)).setMinutes(0)),
        end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
        admin_id: [1, 2, 3, 4],
        editable: false,
        deletable: false,
    },
    {
        event_id: 2,
        title: "Event 2",
        start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
        end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
        admin_id: 2,
        color: "#50b500",
        editable: false,
        deletable: false,
    },
    {
        event_id: 3,
        title: "Event 3",
        start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
        end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
        editable: false,
        deletable: false,
    },
    {
        event_id: 8,
        title: "Event New",
        start: new Date(new Date(new Date().setHours(18)).setMinutes(0)),
        end: new Date(new Date(new Date().setHours(21)).setMinutes(0)),
        editable: false,
        deletable: false
    },
    
    {
        event_id: 5,
        title: "Event 5",
        start: new Date(
            new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(
                new Date().getDate() - 2
            )
        ),
        end: new Date(
            new Date(new Date(new Date().setHours(14)).setMinutes(0)).setDate(
                new Date().getDate() - 2
            )
        ),
        admin_id: 2,
        editable: false,
        deletable: false,
    },
    {
        event_id: 7,
        title: "Event 7",
        start: new Date(
            new Date(new Date(new Date().setHours(18)).setMinutes(30)).setDate(
                new Date().getDate() - 2
            )
        ),
        end: new Date(
            new Date(new Date(new Date().setHours(21)).setMinutes(30)).setDate(
                new Date().getDate() - 2
            )
        ),
        admin_id: 2,
        color: "red",
        editable: false,
        deletable: false,
    }
];
