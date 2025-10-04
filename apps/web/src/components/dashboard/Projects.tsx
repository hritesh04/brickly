const projects = [
  {
    id: 1,
    name: "Test Project",
  },
];

export default function Projects() {
  return (
    <div className="">
      <p className="text-xl font-bold">All Projects</p>
      <div className="mt-8 px-4 border flex flex-wrap">
        {projects.map((project) => {
          return (
            <div key={project.id} className="border">
              <p>{project.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
