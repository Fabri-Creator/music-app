const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

export default formatDate