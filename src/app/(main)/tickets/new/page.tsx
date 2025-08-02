import NewTicketForm from './components/new-ticket-form';

export default function NewTicketPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Create a New Ticket
        </h1>
        <p className="text-muted-foreground">
          Fill out the form below and our support team will get back to you.
        </p>
      </div>
      <NewTicketForm />
    </div>
  );
}
