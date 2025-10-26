export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

export interface AnalyticsData {
  totalUsers: number;
  userWithMostPosts: {
    username: string;
    count: number;
  };
  userWithFewestPosts: {
    username: string;
    count: number;
  };
  userWithMostCompletedTodos: {
    username: string;
    count: number;
  };
  userWithFewestCompletedTodos: {
    username: string;
    count: number;
  };
}
