interface Environment {
  id: string;
  name: string;
  url: string;
}

interface Project {
  id: string;
  name: string;
  environments: Environment[];
}
