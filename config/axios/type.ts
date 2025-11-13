export type IPOST = {
  route: string;
  data: any;
  authorization?: boolean;
  isFormData?: boolean;
}

export type IGET = {
  route: string;
  authorization?: boolean;
}

export type IPUT = {
  route: string;
  data: any;
  authorization?: boolean;
  isFormData?: boolean;
}

export type IPATCH = {
  route: string;
  data: any;
  authorization?: boolean;
  isFormData?: boolean;
}

export type IDELETE = {
  route: string;
  data: any;
  authorization?: boolean;
  isFormData?: boolean;
}