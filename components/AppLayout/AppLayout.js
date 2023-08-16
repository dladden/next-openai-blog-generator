/*
AppLayout will rander the layout and will take on value from children
 */
export const AppLayout = ({ children }) => {
  return (
    /*
    Using h-screen-"height of the screen" to set up the sidebar
    which does not moves with the rest of the screen
     */
    <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
      <div className="flex flex-col text-white overflow-hidden">
        {/* HEADER & LOGO & NEW-POST */}
        <div>
          <div>logo</div>
          <div>new post</div>
          <div>tokens</div>
        </div>
        {/* POST LIST */}
        <div className="flex-1 overflow-auto h-72 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-400">
          post list
        </div>
        {/* USER & LOGOUT */}
        <div>user logout</div>
      </div>
      <div className="bg-green-500">{children}</div>
    </div>
  );
};
