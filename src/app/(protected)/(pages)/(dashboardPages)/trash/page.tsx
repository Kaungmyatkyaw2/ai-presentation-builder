import { getDeletedProjects } from "@/actions/project";
import NotFound from "@/components/global/not-found";
import DeleteAllButton from "./_components/delete-all-buttont";
import Projects from "@/components/global/projects";

const TrashPage = async () => {
  const deletedProjects = await getDeletedProjects();

  return (
    <div className="flex flex-col gap-6 relative ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
            Trash
          </h1>
          <p className="text-base font-normal dark:text-secondary">
            All your deleted presentations
          </p>
        </div>
        <DeleteAllButton Projects={deletedProjects.data || []} />
      </div>
      {deletedProjects.data && deletedProjects.data.length > 0 ? (
        <Projects projects={deletedProjects.data} />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default TrashPage;
