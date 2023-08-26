export interface ICinema {
  _id: string;
  name: string;
  numsRooms: number;
  address: string;
  activityTime: {
    open: string;
    close: string;
  };
  accessibility: boolean;
}

export interface IMovie {
  _id: string;
  Title: string;
  subTitle: string;
  Actors: string;
  Director: string;
  Genre: string[];
  Language: string[];
  LimitAge: string;
  Plot: string;
  Poster: string;
  Released: string;
  Runtime: string;
  Trailer: string;
  Type: string;
  Writer: string;
}

export interface IShowtime {
  _id: string;
  cinemaIdRef: ICinema;
  date: number;
  hour: string;
  hourDetails: {
    start: {
      type: Number;
    };
    end: {
      type: Number;
    };
  };
  movies: IMovie[];
}

export interface IRoom {
  _id: string;
  cinemaId: string;
  numsRows: number;
  numsSetEachRow: number[];
  roomNumber: number;
}

export interface IAllShowTime {
  _id: String;
  cinemaIdRef: ICinema;
  roomId: IRoom;
  hour: string;
  hourDetails: {
    start: {
      type: Number;
    };
    end: {
      type: Number;
    };
  };
  date: string;
  movies: IMovie[];
}
