function RenderCards({ data, title }) {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return <h2 className="mt-5 font-bold text-blue-500 text-xl">{title}</h2>;
}

export default RenderCards;
