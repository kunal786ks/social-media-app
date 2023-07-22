import { collection, deleteDoc, doc, orderBy, query, setDoc, where } from "firebase/firestore";
import { useState } from "react";
import { uuidv4 } from "@firebase/util";
import { db } from "lib/firebase";
import { useToast } from "@chakra-ui/react";
import { useCollectionData } from "react-firebase-hooks/firestore";

export function useAddComment({ postId,uid }) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function addComment(text) {
    setLoading(true);
    const id = uuidv4();
    const date = Date.now();
    const docRef = doc(db, "comments", id);
    await setDoc(docRef, { text, id, postId, date,uid });

    toast({
      title: "Comment added",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });
    setLoading(false);
  }
  return { addComment, isLoading };
}

export function useComments(postId) {
  const q = query(collection(db, "comments"), where("postId", "==", postId),orderBy('date','asc'));
  const [comments, isLoading, error] = useCollectionData(q);
  if (error) 
    throw error;
  
  return { comments, isLoading };
}
export function useDeleteComment(id){
    const [isLoading,setLoading]=useState(false);
    const toast=useToast();
    async function deleteComment(){
        setLoading(true);
        const res=window.confirm('Are You Sure Want to delete this comment?')
        if(res){

            const docRef=doc(db,'comments',id);
            await deleteDoc(docRef)
            toast({
                title:'Comment Deleted',
                status:'info',
                isClosable:true,
                duration:3000,
                position:'top'
            })
        }
    }
    return {deleteComment,isLoading}
}