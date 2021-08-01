// SCROLL COMPONENT
export interface ISlideProps {
  window?: () => Window;
  children: React.ReactElement;
}
// THE POST INTERFACE
export interface IThought {
  content: string;
  author?: string;
  dateCreated?: Date;
  id?: string;
  trimmed: string;
}
// POST COMPONENT INTERFACE
export interface IPostComp {
  userPost?: boolean;
  post: IThought;
}
// LOADING COMPONENT
export interface ILoading {
  variant: "global" | "circlular";
}
// MODAL PROPS
export interface IModalProps {
  closeFunction: () => void;
}
// LOGIN/SIGN-UP FORM DATA
export interface IFormHandlers {
  password: string;
  email: string;
  fullName: "" | string;
  confirmPassword: "" | string;
}
// LOGIN/SIGN-UP TABS
export interface ITabPanel {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}
// USER DATA
export interface IUserData {
  fullName?: string;
  password: string;
  email: string;
}
