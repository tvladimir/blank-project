export interface Question{
    category: string,
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    all_Answers: string[];
    unique?: boolean;
}

export interface QuestionResponse{
    response_code: number;
    results: Question[]
}
