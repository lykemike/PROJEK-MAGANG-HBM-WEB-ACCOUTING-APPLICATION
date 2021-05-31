import React from 'react';

export default function CreateRole () {
	return (
		<div>
			<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
				<h1>Create Role</h1>
				<label
					class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
					for="grid-first-name"
				>
					Role Name
				</label>
				<div class="-mx-3 md:flex mb-6">
					<input
						class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
						id="grid-first-name"
						type="text"
						placeholder="Jane"
					/>
				</div>
				<label
					class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
					for="grid-password"
				>
					Description
				</label>
				<div class="-mx-3 md:flex mb-6">
					<input
						class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
						id="decription"
						type="text"
						placeholder="Input role description"
					/>
				</div>
				<button class="px-5 py-2 border-blue-500 border text-blue-500 hover:bg-blue-500 hover:text-white ">
					Submit
				</button>
			</div>
		</div>
	);
}
