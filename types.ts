interface Environment {
  name: string
  url: string
}

interface Project{
  name: string
  environments: Environment[]
}